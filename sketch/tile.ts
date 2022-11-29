class Tile {
    public img: p5.Graphics;
    public edges: number[];

    constructor(img: p5.Graphics, edges: number[]) {
        this.img = img;
        this.edges = edges;
    }

    rotate(num: number) {
        const w = this.img.width;
        const h = this.img.height;

        const newImg = createGraphics(w, h);
        newImg.imageMode(CENTER);
        newImg.translate(w / 2, h / 2);
        newImg.rotate(HALF_PI * num);
        newImg.image(this.img, 0, 0);

        const newEdges = this.edges.slice();
        const moveEdges = newEdges.splice(0, this.edges.length - num);
        return new Tile(newImg, newEdges.concat(moveEdges));
    }
}
