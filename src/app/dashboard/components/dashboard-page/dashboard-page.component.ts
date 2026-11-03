import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { SellerService } from 'src/app/services/seller.service';


@Component({
  selector: 'seller-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  expensiveProducts: { name: string, price: number }[] = [];

  barChartData: ChartDataSets[] = [];
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  barChartColors: Color[] = [
    {
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2
    }
  ];
  barChartLegend = false;
  barChartPlugins = [];
  barChartType: ChartType = 'bar';
  


  //CARD
  sellersCount: number = 0;
  usersCount: number = 0;
  //

  

  pieChartData: SingleDataSet = [0, 0];
  pieChartLabels: Label[] = ['nombre de compte users' , 'nombre de compte sellers'];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins = [];

  constructor(private productsService: ProductsService, private usersService: UsersService, private sellerService: SellerService  ) { }

  ngOnInit(): void {
    this.productsService.getExpensiveProducts(10).subscribe((products) => {
      this.expensiveProducts = products.map((product) => ({ name: product.name, price: product.price }));
      this.updateBarChartData(); // Mettre à jour les données du bar chart
    });



//CARD 
    this.usersService.getUserCount().subscribe((result) => {
      this.usersCount = result.count;
      this.sellerService.getSellerCount().subscribe((sellerResult) => {
        this.sellersCount = sellerResult.count;

    });
  });

 

  



  }
  updateBarChartData(): void {
    const productNames = this.expensiveProducts.map((product) => product.name);
    const productPrices = this.expensiveProducts.map((product) => product.price);
  
    this.barChartLabels = productNames;
    this.barChartData = [{ data: productPrices, label: 'Prix' }];
  }
}
