import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Skill } from './models/form.model';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  list: Observable<Skill[]>;
  private itemsCollection: AngularFirestoreCollection<Skill>;
  itemDoc: AngularFirestoreDocument<Skill[]>;

  constructor(private afs: AngularFirestore) { 
    this.itemsCollection = afs.collection<Skill>('list');
    this.list = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Skill;
        data.id = a.payload.doc.id;
        return data;
      })));
  }

  addItem(item: any){      
    this.itemsCollection.add(item)
    .then(item => { console.log(item)})
    .catch(e => { console.log(e)})
  }

  deleteItem(item: Skill){
    this.itemDoc = this.afs.doc(`list/${item.id}`);
    this.itemDoc.delete();
   }

}
