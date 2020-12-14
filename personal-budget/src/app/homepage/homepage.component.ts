import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import { AuthService } from '@auth0/auth0-angular';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from '../profile/profile.component';



@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: []
        }
    ],
    labels: []
};

  constructor(public http: HttpClient, private profileJson:ProfileComponent) {}

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          // this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.datasets[0].data[i] = res[i].cost;
          // this.dataSource.labels[i] = res.myBudget[i].title;
          this.dataSource.labels[i] = res[i].title;
          this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
        }
        this.createPieChart();
        this.createPolarAreaChart();
        this.createBarChart();
      });
  }


createPieChart(): void {
    // var ctx = document.getElementById('myChart').getContext('2d');
    const ctx = document.getElementById('myPieChart');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

createPolarAreaChart(): void {
  // var ctx = document.getElementById('myChart').getContext('2d');
  const ctx = document.getElementById('myPolarAreaChart');
  const myPolarAreaChart = new Chart(ctx, {
      type: 'polarArea',
      data: this.dataSource,
  });
}

createBarChart(): void {
  // var ctx = document.getElementById('myChart').getContext('2d');
  const ctx = document.getElementById('myBarChart');
  const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: this.dataSource
  });
}

// (document.getElementById("tsn_list") as HTMLTextAreaElement).value;

addNewCost(): void {
  const titleAdd = (document.getElementById('addName')as HTMLTextAreaElement).value;
  const costAdd = (document.getElementById('addCost')as HTMLTextAreaElement).value;
  const colorAdd = (document.getElementById('addColor')as HTMLTextAreaElement).value;

  /* console.log('aName', (document.getElementById('addName')as HTMLTextAreaElement).value);
  console.log('aCost', (document.getElementById('addCost')as HTMLTextAreaElement).value);
  console.log('aColor', (document.getElementById('addColor')as HTMLTextAreaElement).value); */
  const user = { title: titleAdd, cost: costAdd, color: colorAdd};
  console.log(user);

  this.http.post('http://localhost:3000/insertBudget', user).subscribe((res: any) => {
    console.log(res);
  });



  window.location.reload();
}

removeOldCost(): void {

  const valueRemove = (document.getElementById('removeName')as HTMLTextAreaElement).value;
  console.log(valueRemove);

  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {
      title: valueRemove,
    },
  };
  console.log(options);

  // console.log('rName', (document.getElementById('removeName')as HTMLTextAreaElement).value);
  this.http.delete('http://localhost:3000/deleteBudget', options).subscribe((res: any) => {
    console.log(res);
  });



  //window.location.reload();
  console.log(this.profileJson)
}



}
