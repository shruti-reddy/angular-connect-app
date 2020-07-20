import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pagination } from "../_models/pagination";
import { Message } from "../_models/Message";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: string = "unread";
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.messages = data["messages"].result;
      this.pagination = data["messages"].pagination;
    });
  }

  loadMessages() {
    this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer
      )
      .subscribe(
        (data) => {
          this.messages = data.result;
          this.pagination = data.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
  deleteMessage(id: number) {
    this.alertify.confirm(
      "Are you sure you want to delete this message ?",
      () => {
        this.userService
          .deleteMessage(id, this.authService.decodedToken.nameid)
          .subscribe(
            () => {
              this.alertify.success("message has been deleted");
              this.messages.splice(
                this.messages.findIndex((m) => m.id === id),
                1
              );
            },
            (error) => {
              this.alertify.error("Failed to delete the message");
            }
          );
      }
    );
  }
}
