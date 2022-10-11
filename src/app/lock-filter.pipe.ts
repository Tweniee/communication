import { Pipe, PipeTransform } from '@angular/core';

interface Data {
  body: string,
  id: number,
  title: string,
  user_id: number
}

@Pipe({
  name: 'lockFilter'
})
export class LockFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter((item: any)=>{
        return JSON.stringify(item).toLowerCase().includes(args);
    });
}

}
