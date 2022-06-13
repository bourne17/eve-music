import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class CrudserviceService {
  private dbInstance: SQLiteObject;
  readonly db_name: string = 'remotestack.db';
  readonly db_table: string = 'userTable';
  USERS: Array<any>;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: this.db_name,
          location: 'default',
        })
        .then((sqLite: SQLiteObject) => {
          this.dbInstance = sqLite;
          sqLite
            .executeSql(
              `
                  CREATE TABLE IF NOT EXISTS ${this.db_table} (
                    userid INTEGER PRIMARY KEY,
                    nombre varchar(255),
                    email varchar(255),
                    apellido varchar(255),
                    password varchar(255)
                  )`,
              []
            )
            .then((res) => {
              // alert(JSON.stringify(res));
            })
            .catch((error) => alert(JSON.stringify(error)));
        })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }

  // Crud
  public addItem(n,a,e,p) {
    // validation
    if (!n.length || !e.length) {
      alert('Provide both email & name');
      return;
    }
    this.dbInstance
      .executeSql(
        `
      INSERT INTO ${this.db_table} (nombre, apellido, email, password) VALUES ('${n}', '${a}', '${e}', '${p}')`,
        []
      ).then(
        () => {
          alert('Agregado exitosamente');
          //this.getAllUsers();
        },
        (e) => {
          alert(JSON.stringify(e.err));
        }
      );
    }


  /*getAllUsers() {
    return this.dbInstance
      .executeSql(`SELECT * FROM ${this.db_table}`, [])
      .then(
        (res) => {
          this.USERS = [];
          if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
              this.USERS.push(res.rows.item(i));
            }
            return this.USERS;
          }
        },
        (e) => {
          alert(JSON.stringify(e));
        }
      );
  }*/

  // Get user
  async getUser(email: any): Promise<any> {
    return this.dbInstance
      .executeSql(
        `SELECT * FROM ${this.db_table} WHERE email = ?`,
        [email]
      )
      .then((res) => {
        return {
          userid: res.rows.item(0).userid,
          nombre: res.rows.item(0).nombre,
          email: res.rows.item(0).email,
          password: res.rows.item(0).password,
        };
      });
  }

  // Update
  /*updateUser(id, name, email) {
    let data = [name, email];
    return this.dbInstance.executeSql(
      `UPDATE ${this.db_table} SET nombre = ?, email = ? WHERE userid = ${id}`,
      data
    );
  }*/

  // Delete
  /*deleteUser(user) {
    this.dbInstance
      .executeSql(
        `
      DELETE FROM ${this.db_table} WHERE userid = ${user}`,
        []
      )
      .then(() => {
        alert('Registro eliminado!');
        this.getAllUsers();
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
  }*/

 /* getItShowed(): Promise<any> {
    return this.dbInstance
      .executeSql(`SELECT isIntroShowed FROM ${this.db_table}`)
      .then((res) => ({
        isIntroShowed: res.rows.item(0).isIntroShowed,
      });
  }*/

  /*setItShowed(value) {
    let data = [value];
    return this.dbInstance.executeSql(
      `UPDATE ${this.db_table} SET isIntroShowed = ?`,
      data
    );
  }*/

  }













