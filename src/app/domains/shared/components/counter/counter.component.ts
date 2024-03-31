import { Component, Input, SimpleChanges, signal } from '@angular/core';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor(){
    //No Asyn crono
    //Antes de renderizar
    // Solo corre una vez
    console.log('constructor');
    console.log('-' .repeat(10));
  }

  ngOnChanges(changes: SimpleChanges){
    // Se ejecuta antes y durante el render
    console.log('ngOnChanges');
    console.log('-' .repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if(duration && duration.currentValue !== duration.previousValue){
      this.doSomething();
    }   
  }

  ngOnInit(){
    // Corre despues del render
    //Solo corre una vez
    //async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message); 
    this.counterRef = window.setInterval(() =>{
      console.log('run interval');
      this.counter.update(statePrev => statePrev + 1)
    },1000);
  }

  ngAfterViewInit() {
    //After (despues) render
    //Si los hijos ya fuereon renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy(){
    console.log('nfOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething(){
    //Puedo correr cualquier cosa Asyncronica
    console.log('Change duration')
  }
}
