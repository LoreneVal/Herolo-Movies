export class Movie {
  constructor(
    public id: number,
    public title:string,
    public year:number,
    public runtime:number,
    public genre:string,
    public director:string,
    public imagePath:string
  ) {}
}
