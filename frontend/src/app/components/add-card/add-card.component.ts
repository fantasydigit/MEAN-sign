import { Component, } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from 'src/app/_services/card.service';
import { StorageService } from '../../_services/storage.service';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent  {
  card: Card = {
    title: '',
    description: '',
    published: false,
    username: ''
  };
  submitted = false;

  constructor(private cardService: CardService,
             private storageSerice: StorageService
    ) { }
    
    // ngOnInit(): void {
    // }
    
    user = this.storageSerice.getUser();
    saveCard(): void {
      // window.alert('hgfdjgfjhgf')
      const data = {
        title: this.card.title,
      description: this.card.description,
      username: this.user.username
    };

    this.cardService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newCard(): void {
    this.submitted = false;
    this.card = {
      title: '',
      description: '',
      published: false,
      username:'',
    };
  }
}
