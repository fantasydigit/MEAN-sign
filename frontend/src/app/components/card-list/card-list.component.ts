import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/_services/card.service';


import { StorageService } from '../../_services/storage.service';

import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-cards-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  email?: string;
  cards?: Card[];
  currentCard: Card = {
    title: '',
    description: '',
    published: false,
    username:''    
  };
  currentIndex = -1;
  title = '';
  
  private roles: string[] = [];
  IscurrentCardEdit: boolean = false;
  isAllow = false;

  constructor(
    private cardService: CardService,
    private storageService: StorageService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.retrieveCards();
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.isAllow = this.roles.includes('ROLE_ADMIN');
    this.currentCard.username = user.username;
  }

  retrieveCards(): void {
    this.cardService.getAll()
      .subscribe({
        next: (data) => {
          this.cards = data;
          
          console.log("this is card data of card-list",data);
        },
        error: (e) => console.error(e)
      });
      
  }

  refreshList(): void {
    this.retrieveCards();
    this.currentCard = {};

    if(this.currentCard.username == this.storageService.getUser().username || this.isAllow)
    this.IscurrentCardEdit = true;
    this.currentIndex = -1;
  }

  setActiveCard(card: Card, index: number): void {
    this.currentCard = card;
    if(card.username == this.storageService.getUser().username || this.isAllow)
      this.IscurrentCardEdit = true;
    else this.IscurrentCardEdit = false;  
    console.log('============> isCurrent', this.IscurrentCardEdit)
    this.currentIndex = index;
  }

  removeAllCards(): void {
    
    this.cardService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentCard = {};
    this.currentIndex = -1;

    this.cardService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.cards = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
 
}