import { Component, OnInit } from '@angular/core';
import {Todo} from "../models/todo";
import {FormBuilder} from "@angular/forms";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AbstractControl, FormArray, FormGroup,FormControl} from "@angular/forms";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todolist-angular';
  public todoList: Array<Todo> = [
    {
      label: 'foo',
      at: new Date(),
      finished: true,
    }, {
      label: 'bar',
      at: new Date(),
      finished: false,
    }, {
      label: 'foobar',
      at: new Date(),
      finished: true,
    }
  ];

  // new FormArray();
  public form = this.fb.array([]);

  public constructor(
    private fb: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    for (let i = 0; i < this.todoList.length; i++) {
      this.addTodo();
    }

    // const arrTmp = [];
    // for (const todo of this.todoList) {
    //   const formTodo = {
    //     label: todo.label,
    //     at: formatDate(todo.at, 'YYYY-MM-dd', 'en'),
    //     finished: todo.finished,
    //   };
    //
    //   arrTmp.push(formTodo);
    // }
    //
    // this.form.setValue(arrTmp);
    // =
    this.form.setValue(this.todoList.map((todo: Todo) => {
      return {
        label: todo.label,
        at: formatDate(todo.at, 'YYYY-MM-dd', 'en'),
        finished: todo.finished,
      };
    }));
  }

  public addTodo(): void {
    const d = new Date();
    // setDate modifie la date, getDate récupère le jour uniquement
    d.setDate( d.getDate() + 7);
    this.form.push(
      // new FormGroup();
      this.fb.group({
        // new FormControl();
        label: [''],
        // new FormControl();
        at: [formatDate(d, 'YYYY-MM-dd', 'en')],
        // new FormControl();
        finished: [false],
      })
    );
  }

  removeRow(index: number): void {
    this.form.removeAt(index);
  }

  saveTodo(): void{
    this.todoList.push();
  }

  onSubmit(): void {
    this.todoList = this.form.value.map((val: {label: string, at: string, finished: boolean}) => {
      return{
        label: val.label,
        at: new Date(val.at),
        finished: val.finished,
      }
    });
    console.log(this.todoList);
  }

  public getControl(formGroup: AbstractControl, key: string): FormControl
  {
    if (!(formGroup instanceof FormGroup)) {
      throw new Error('Form given as first argument is not an instance of FormGroup');
    }

    const fc = formGroup.get(key);
    if (!(fc instanceof FormControl)) {
      throw new Error('Form retrieve is not an instance of FormControl');
    }

    return fc;
  }

  // public getControl(formGroup: AbstractControl, key: string): FormControl
  // {
  //   return (formGroup as FormGroup).get(key) as FormControl;
  // }
}
