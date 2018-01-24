import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TodosProvider } from '../../providers/todos/todos';
import { Storage } from '@ionic/storage';
import { AuthPage } from '../auth/auth';
import { ProtectedPage } from '../protected/protected';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends ProtectedPage{

  username: string;
  todos: any;

  constructor(
    public navCtrl:       NavController, 
    public todosProvider: TodosProvider, 
    public navParams:     NavParams,
    public alertCtrl:     AlertController,
    public storage:       Storage) {

    super(navCtrl, navParams, storage)

    this.navCtrl = navCtrl;
    this.username = window.localStorage.getItem('username');
    this.getTodos();
  }

  getTodos() {
    this.todosProvider.getTodos().then((data) => {
      this.todos = data;
    })
  }

  createTodo() {
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [{
        name: 'title'
      }],
      buttons: [{
        text: 'Cancel'
      },
      {
        text: 'Save',
        handler: data => {
          this.todosProvider.createTodo({ title: data.title });
        }
      }]
    });

    prompt.present();
  }

  updateTodo(todo) {
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [{
        name: 'title'
      }],
      buttons: [{
        text: 'Cancel'
      },
      {
        text: 'Save',
        handler: data => {
          this.todosProvider.updateTodo({
            _id: todo._id,
            _rev: todo._rev,
            title: data.title
          });
        }
      }]
    });
    prompt.present();
  }

  deleteTodo(todo){
    this.todosProvider.deleteTodo(todo);
  }
}
