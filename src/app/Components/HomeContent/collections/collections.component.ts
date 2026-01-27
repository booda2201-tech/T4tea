import { Component } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {

  categories = [
    {
      img: '../../../../assets/p1.png',
      title: 'Tea Cups',
      description: 'Where Comfort Meets Refinement.'
    },
    {
      img: '../../../../assets/p2.png',
      title: 'Tea Bots',
      description: 'Designed to Brew Excellence.'
    },
    {
      img: '../../../../assets/p3.png',
      title: 'Matcha Mixer',
      description: 'Savor the Essence of Matcha.'
    }
  ]

  // constructor(private api : apiService) { }


  // ngOnInit(): void {
  //   this.api.getallCategories().subscribe({
  //     next:(res:any)=>{
  //       console.log(this.categories);
  //       this.categories = res;
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   })
  // }


}
