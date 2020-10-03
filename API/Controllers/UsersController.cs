using System;
using System.Net;
using System.Threading.Tasks;
using API.Dtos;
using API.ExceptionHandler;
using API.Services;
using AutoMapper;
using Infrastructure;
using Infrastructure.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ToDoContext _toDoContext;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UsersController(ToDoContext toDoContext, IMapper mapper, ITokenService tokenService)
        {
            _toDoContext = toDoContext;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            ////var user = await _userManager.FindByEmailFromClaimsPrincipleAsync(HttpContext.User);
            var outcome = _tokenService.ValidateCurrentUserEmailFromToken(HttpContext.Request.Headers["Authorization"]);

            if (outcome.Successful)
            {
                var user = await _toDoContext.Users.FirstOrDefaultAsync(a => a.Email.ToLower() == outcome.Result.ToLower());
                return Ok(new UserDto
                {
                    Email = user.Email,
                    Token = Convert.ToString(HttpContext.Request.Headers["Authorization"]).Replace("Bearer ", ""),
                    DisplayName = user.DisplayName
                });
            }

            return BadRequest(new ApiResponse((int)HttpStatusCode.Unauthorized));
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            var userExists = await _toDoContext.Users.FirstOrDefaultAsync(a => a.Email.ToLower() == email.ToLower());
            return userExists != null;
        }

        //////////[Authorize]
        //////////[HttpGet("address")]
        //////////public async Task<ActionResult<AddressDto>> GetUserAddress()
        //////////{
        //////////    var user = await _userManager.FindUserByClaimPrincipleWithAddressAsync(HttpContext.User);

        //////////    return _mapper.Map<AddressDto>(user.Address);
        //////////}

        //////[Authorize]
        //////[HttpPut("address")]
        //////public async Task<ActionResult<UserDto>> UpdateUserAddress(UserUpdateDto userUpdateDto)
        //////{
        //////    var user = await _toDoContext.Users.FirstOrDefaultAsync(a => a.Email.ToLower() == userUpdateDto.Email.ToLower());

        //////    user.
        //////    user.Address = _mapper.Map<Address>(address);

        //////    var result = await _userManager.UpdateAsync(user);

        //////    if (result.Succeeded)
        //////        return Ok(_mapper.Map<AddressDto>(user.Address));

        //////    return BadRequest("Problem updating the user");
        //////}


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _toDoContext.Users.FirstOrDefaultAsync(a => a.Email.ToLower() == loginDto.Email.ToLower() && a.Password == loginDto.Password);

            if (user == null) return Unauthorized(new ApiResponse((int)HttpStatusCode.Unauthorized));

            return new UserDto
            {
                Email = loginDto.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiResponse((int)HttpStatusCode.BadRequest, "Email address is in use"));
            }

            var user = _mapper.Map<User>(registerDto);
            await _toDoContext.Users.AddAsync(user);
            var output = await _toDoContext.SaveChangesAsync();

            if (output > 0)
            {
                var userDto = _mapper.Map<UserDto>(user);
                userDto.Token = _tokenService.CreateToken(user);
                return Ok(userDto);
            }

            return BadRequest(new ApiResponse((int)HttpStatusCode.BadRequest));
        }
    }
}