import {Component} from '@angular/core';
import {ApiService} from '../app/api.service';
import {environment} from '../../src/environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'GitHub API';

  private serviceUrl: string = environment.GATEWAY_URL;

  private users: Map<string, string>;

  constructor(private apiService: ApiService) {
  }

  deleteItem(item) {
    this.users.delete(item.key);
  }

  receiveGitHubUsers() {
    this.users = new Map();
    const url = this.getAPIUrl('0');
    this.apiService.get(url).subscribe(value => {
        const object = this.getJsonObject(value);
        if (object) {
          const arr: string[] = object;
          arr.forEach((element) => {
            const obj = this.getJsonObject(element);
            this.users.set(obj.login, obj.avatar_url);
          }); 
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('complete');
      }
    );
  }

  private getJsonObject(input: any): any {
    const jsonString: string = JSON.stringify(input);
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
  }

  private getAPIUrl(sinceId: string): string {
    let url: string = this.serviceUrl + '/users?since=' + sinceId;
    return url;
  }
}
