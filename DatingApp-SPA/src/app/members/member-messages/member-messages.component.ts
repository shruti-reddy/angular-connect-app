import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from "src/app/_services/auth.service";
import { AlertifyService } from "src/app/_services/alertify.service";
import { Message } from "src/app/_models/Message";
import { UserService } from "src/app/_services/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-member-messages",
  templateUrl: "./member-messages.component.html",
  styleUrls: ["./member-messages.component.css"],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadMessageThread(
      this.authService.decodedToken.nameid,
      this.recipientId
    );
    //this.userService.markAsRead(userId, recipientId);
  }

  loadMessageThread(userId, recipientId) {
    this.userService.getMessageThread(userId, recipientId).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe(
        (message: Message) => {
          this.messages.unshift(message);
          this.newMessage.content = "";
        },
        (error) => {
          this.alertify.error(error);
        }
      );
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
