export class Movie {
  constructor(
    public imdbID: string,
    public title:string,
    public year:number,
    public runtime:number,
    public genre:string,
    public director:string,
    public poster:string
  ) {}
}
