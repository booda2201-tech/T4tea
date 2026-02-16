import { Component, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('navbar', { static: false }) navbar!: ElementRef;
  @ViewChildren('floatingItem') floatingItems!: QueryList<ElementRef>;
  @ViewChildren('floatingIcon') floatingIcons!: QueryList<ElementRef>;

  // متغيرات الحالة
  isSearchOpen = false;
  isEditing: boolean = false;
  isAccountMenuOpen = false;
  isMobileMenuOpen = false;
  isModalOpen = false; // التحكم في ظهور المودال في الـ DOM

  userData = {
  name: 'abdo',
  email: 'booda2201@gmail.com',
  phone: '01122334455'
};


addresses = [
  {
    id: 1,
    main: 'El Tahrir St, Building 12, Floor 2, Apt 4',
    sub: 'el-tharwa el-madaneia - Hadayek Al-Ahram, Giza, Egypt',
    landmark: 'Ramses Metro',
    isDefault: true
  },
  {
    id: 2,
    main: '1111, Building 1111, Floor 111, Apt 11',
    sub: 'el-tharwa el-madaneia - Hadayek Al-Ahram, Giza, Egypt',
    landmark: '111',
    isDefault: false
  }
];


newAddress = {
  country: 'Egypt',
  gov: 'Giza',
  city: 'Giza City',
  district: 'Hadayek Al-Ahram',
  street: '',
  bld: '',
  floor: '',
  apt: '',
  landmark: '',
  setAsDefault: false
};

// الدالة المسؤولة عن الحفظ
addAddress(event: Event) {
  event.preventDefault(); // عشان الصفحة متعملش Refresh

  const id = Date.now(); // رقم فريد لكل عنوان
  const formattedAddress = {
    id: id,
    main: `${this.newAddress.street}, Building ${this.newAddress.bld}, Floor ${this.newAddress.floor}, Apt ${this.newAddress.apt}`,
    sub: `${this.newAddress.district} - ${this.newAddress.city}, ${this.newAddress.gov}, ${this.newAddress.country}`,
    landmark: this.newAddress.landmark,
    isDefault: this.newAddress.setAsDefault
  };

  // لو المستخدم اختار ده يبقى افتراضي، نخلي الباقي false
  if (formattedAddress.isDefault) {
    this.addresses.forEach(a => a.isDefault = false);
  }

  this.addresses.push(formattedAddress);

  // نقفل المودال بالأنميشين اللي إنت عامله
  this.closeModal();

  // أنميشين ظهور العنوان الجديد (Slide in من اليمين)
  setTimeout(() => {
    gsap.from(`#address-${id}`, {
      x: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  }, 100);

  // تصغير (Reset) للفورم بعد الحفظ
  this.resetForm();
}

resetForm() {
  this.newAddress = {
    country: 'Egypt', // اختار دولة واحدة افتراضية
    gov: 'Giza',
    city: 'Giza City',
    district: 'Hadayek Al-Ahram',
    street: '',
    bld: '',
    floor: '',
    apt: '',
    landmark: '',
    setAsDefault: false
  };
}


deleteAddress(id: number) {
  const element = document.getElementById(`address-${id}`);

  // أنميشين "الخلع"
  gsap.to(element, {
    x: -150, // يروح للشمال
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      // بعد ما الأنميشين يخلص، نمسحه من الداتا فعلياً
      this.addresses = this.addresses.filter(addr => addr.id !== id);
    }
  });
}

// --- تغيير العنوان الافتراضي ---
makeDefault(id: number) {
  this.addresses.forEach(addr => addr.isDefault = (addr.id === id));
}


  toggleEdit() {
  this.isEditing = !this.isEditing;
}

saveProfile() {
  // هنا بتحط كود الحفظ في الـ Database
  this.isEditing = false;
  // ممكن تطلع Toast Message هنا
}





  ngAfterViewInit() {
    setTimeout(() => {
      this.initNavbarAnimation();
      this.initFloatingEffect();
    }, 500);
  }

  // --- أنميشين فتح المودال باستخدام GSAP ---
openAddAddressModal() {
  this.isModalOpen = true;
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    const overlay = document.querySelector('.t4tea-modal-overlay');
    const container = document.querySelector('.t4tea-modal-container');
    const isMobile = window.innerWidth <= 768;

    const tl = gsap.timeline();

    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    if (isMobile) {
      // أنميشين الموبايل: Slide Up من تحت
      tl.fromTo(container,
        { y: "100%" },
        { y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.2"
      );
    } else {
      // أنميشين الديسك توب: Scale Up & Fade In
      tl.fromTo(container,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.2"
      );
    }
  }, 0);
}
closeModal() {
  const overlay = document.querySelector('.t4tea-modal-overlay');
  const container = document.querySelector('.t4tea-modal-container');
  const isMobile = window.innerWidth <= 768;

  const tl = gsap.timeline({
    onComplete: () => {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto';
    }
  });

  // في الموبايل يتزحلق لتحت ويختفي
  tl.to(container, { y: isMobile ? "100%" : 30, opacity: isMobile ? 1 : 0, duration: 0.4, ease: "power3.in" });
  tl.to(overlay, { opacity: 0, duration: 0.2 }, "-=0.2");
}

  // --- الأنميشين القديم (Navbar & Floating) ---
  initFloatingEffect() {
    this.floatingItems.forEach((item, index) => {
      gsap.to(item.nativeElement, {
        y: -6,
        duration: 1.5 + (index * 0.2),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });

    this.floatingIcons.forEach((icon, index) => {
      gsap.to(icon.nativeElement, {
        y: 4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.3
      });
    });
  }

  initNavbarAnimation() {
    if (!this.navbar) return;
    const nav = this.navbar.nativeElement;
    gsap.to(nav, {
      scrollTrigger: {
        trigger: "body",
        start: "top -50",
        toggleActions: "play none none reverse",
      },
      top: "15px",
      width: "90%",
      backgroundColor: "#003d37",
      height: "75px",
      borderRadius: "50px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      duration: 0.5
    });
  }

  toggleSearch() { this.isSearchOpen = !this.isSearchOpen; }
  toggleAccountMenu(event: Event) {
    event.stopPropagation();
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}
