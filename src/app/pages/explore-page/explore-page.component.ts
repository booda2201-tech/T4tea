import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';

interface ExploreCollection {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  type: string;
  spanClass: string;
}

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss'],
})
export class ExplorePageComponent implements OnInit {
  collections: ExploreCollection[] = [
    {
      id: 'black',
      title: 'Signature Black Teas',
      subtitle: 'Bold, robust, and awakening.',
      image: 'assets/imges/our collectons/6Q1A2223.webp',
      type: 'Black Tea',
      spanClass: 'md:col-span-8',
    },
    {
      id: 'green',
      title: 'Green Teas',
      subtitle: 'Fresh, grassy, and uplifting.',
      image: 'assets/imges/our collectons/6Q1A2220.webp',
      type: 'Green Tea',
      spanClass: 'md:col-span-6',
    },
    {
      id: 'herbal',
      title: 'Herbal Infusions',
      subtitle: 'Caffeine-free comfort for every mood.',
      image: 'assets/imges/our collectons/6Q1A3357.webp',
      type: 'Herbal Tea',
      spanClass: 'md:col-span-6',
    },
  ];

  moods = [
    { label: 'Calm', icon: 'bi-moon-stars' },
    { label: 'Energize', icon: 'bi-lightning' },
    { label: 'Focus', icon: 'bi-bullseye' },
    { label: 'Digest', icon: 'bi-flower1' },
  ];

  ngOnInit(): void {
    gsap.from('.explore-hero__content', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  shopLink(type: string): string[] {
    return ['/shop'];
  }

  shopQueryParams(type: string): { type: string } {
    return { type };
  }
}
