export class Song {
  id: string;
  imageIcon: string;
  title: string;
  artiste: string;
  fileLink: string;

  constructor(
    id: string,
    title: string,
    artiste: string,
    fileLink: string,
    imageIcon: string
  ) {
    this.id = id;
    this.title = title;
    this.artiste = artiste;
    this.fileLink = fileLink;
    this.imageIcon = imageIcon;
  }
}
