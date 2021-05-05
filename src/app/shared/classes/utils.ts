

export function getHomeBackgroundImage(): string{
    
    const images: string[] = [
        '/assets/images/backgrounds/dona.jpg', 
        '/assets/images/backgrounds/familia_surant.jpg', 
        '/assets/images/backgrounds/familia.jpg',
        '/assets/images/backgrounds/home.jpg',
        '/assets/images/backgrounds/mare_i_filla.jpg',
        '/assets/images/backgrounds/nena.jpg',
        '/assets/images/backgrounds/noia.jpg',
    ];
  
    let i = Math.floor(Math.random() * images.length);
  
    return images[i];
}

export function getRandomBackground() : string {

    const images: string[] = [
        '/assets/images/backgrounds/fons_aleatori_1.svg', 
        '/assets/images/backgrounds/fons_aleatori_2.svg', 
        '/assets/images/backgrounds/fons_aleatori_3.svg',
        '/assets/images/backgrounds/fons_aleatori_4.svg'
        ];
    
    let i = Math.floor(Math.random() * images.length);
    
    return images[i];
}
