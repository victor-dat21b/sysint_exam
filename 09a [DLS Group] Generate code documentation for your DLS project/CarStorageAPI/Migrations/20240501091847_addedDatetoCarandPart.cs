using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarStorageApi.Migrations
{
    /// <inheritdoc />
    public partial class addedDatetoCarandPart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Parts",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Cars",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SoldDate",
                table: "Cars",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Parts");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "SoldDate",
                table: "Cars");
        }
    }
}
