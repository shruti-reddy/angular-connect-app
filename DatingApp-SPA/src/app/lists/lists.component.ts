import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { User } from "../_models/user";
import { PaginatedResult, Pagination } from "../_models/pagination";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"],
})
export class ListsComponent implements OnInit {
  likesParams: string;
  users: User[];
  pagination: Pagination;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });
    this.likesParams = "Likers";
  }

  likersOrlikees() {
    this.userService
      .getUsers(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        null,
        this.likesParams
      )
      .subscribe(
        (data: PaginatedResult<User[]>) => {
          this.users = data.result;
          this.pagination = data.pagination;
        },
        (error) => {
          console.log("error");
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.likersOrlikees();
  }
}
