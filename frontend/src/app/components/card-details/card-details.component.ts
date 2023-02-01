import { Component, Input, OnInit } from '@angular/core';
import { CardService } from 'src/app/_services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';

import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  
  @Input() viewMode = false;
  @Input() IscurrentCardEdit = false;

  message = '';

  @Input() currentCard: Card = {
    title: '',
    description: '',
    published: false,
    username: ''
  };
  
  
  private roles: string[] = [];
  public isAllow = false;
  isName = false;
  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,

    ) { }

    
    ngOnInit(): void {
      
      if (!this.viewMode) {
        this.message = '';
        this.getCard(this.route.snapshot.params["id"]);
      }
    
    const user = this.storageService.getUser();
    this.roles = user.roles;
    // this.isAllow = this.roles.includes('ROLE_ADMIN') ;
    // this.currentCard.username = user.username;
    // window.localStorage.setItem('current_user', user.username);
    console.log("##################", user.username)
    console.log(">>>>>>>>>>>>>>>>>>", this.currentCard.username)
    console.log("role?", this.roles.includes('ROLE_ADMIN') );
    // console.log(user.username == this.currentCard.username,user.username,this.currentCard.username)
    // this.isAllow = (this.roles.includes('ROLE_ADMIN')  || user.username == this.currentCard.username);
    // console.log("this.isAllow:", this.isAllow)
    // this.isAllow = this.roles.includes('ROLE_ADMIN') ;
    // this.isName = user.username == this.currentCard.username;
  }

  getCard(id: string): void {    
      console.log("sdfjggsddfbnhsdafgghhgfdfasgxhjhhgfdfffds")
    this.cardService.get(id)
      .subscribe({
        next: (data) => {
          this.currentCard = data;
          console.log("this is data of card list",data);
        },
        error: (e) => console.error(e)
      });     
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentCard.title,
      description: this.currentCard.description,
      published: status,
      username: this.currentCard.username
    };
    console.log('=========>', this.currentCard.username)

    this.message = '';
   

    this.cardService.update(this.currentCard.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentCard.published = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateCard(): void {
    this.message = '';

    this.cardService.update(this.currentCard.id, this.currentCard)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Post was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  
  deleteCard(): void {
    this.cardService.delete(this.currentCard.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/tutorials']);
          window.alert('This post was deleted successfully!')
        },
        error: (e) => console.error(e)
      });
  }
}
