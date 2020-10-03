using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Migrations
{
    public partial class UpdateDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_Labels_LabelId",
                table: "ToDoItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ToDoItems_Statuses_StatusId",
                table: "ToDoItems");

            migrationBuilder.DropIndex(
                name: "IX_ToDoItems_LabelId",
                table: "ToDoItems");

            migrationBuilder.DropIndex(
                name: "IX_ToDoItems_StatusId",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "LabelId",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "ToDoItems");

            migrationBuilder.AddColumn<string>(
                name: "Label",
                table: "ToDoItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ToDoItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Label",
                table: "ToDoItems");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ToDoItems");

            migrationBuilder.AddColumn<int>(
                name: "LabelId",
                table: "ToDoItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "ToDoItems",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ToDoItems_LabelId",
                table: "ToDoItems",
                column: "LabelId");

            migrationBuilder.CreateIndex(
                name: "IX_ToDoItems_StatusId",
                table: "ToDoItems",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_Labels_LabelId",
                table: "ToDoItems",
                column: "LabelId",
                principalTable: "Labels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoItems_Statuses_StatusId",
                table: "ToDoItems",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
