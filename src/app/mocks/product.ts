export const products = [
    {
        id: 'nike-air-zoom-pegasus-38',
        name: 'Nike Air Zoom Pegasus 38',
        description: 'The Nike Air Zoom Pegasus 38 continues to put a spring in your step...',
        price: 899.9,
        rating: 4.8,
        reviews: 124,
        colors: [
            { name: 'blue', value: '#0000FF' },
            { name: 'black', value: '#000000' },
            { name: 'white', value: '#FFFFFF' },
            { name: 'red', value: '#FF0000' },
        ],
        sizes: [
            { size: '36', color: 'blue', stock: 2 },
            { size: '37', color: 'blue', stock: 2 },
            { size: '38', color: 'blue', stock: 2 },
            { size: '39', color: 'black', stock: 3 },
            { size: '40', color: 'white', stock: 3 },
            { size: '41', color: 'red', stock: 3 },
        ],
        images: [
            'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
            'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg',
            'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
            'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg',
        ],
        tabs: {
            details: 'O Pegasus 38 oferece excelente retorno de energia com espuma responsiva e ajuste confortável.',
            specs: 'Tecnologia Zoom Air, cabedal em mesh, entressola em espuma Nike React.',
            reviews: 'Clientes elogiam o conforto durante corridas longas e o design moderno.',
            questions: 'Esse tênis é indicado para pisada neutra? Qual a durabilidade da sola?'
        }
    },
    {
        id: 'adidas-ultraboost-22',
        name: 'Adidas Ultraboost 22',
        description: 'The Adidas Ultraboost 22 offers supreme comfort...',
        price: 999.9,
        rating: 4.9,
        reviews: 98,
        colors: [
            { name: 'white', value: '#FFFFFF' },
            { name: 'black', value: '#000000' },
            { name: 'grey', value: '#808080' },
        ],
        sizes: [
            { size: '37', color: 'white', stock: 2 },
            { size: '38', color: 'white', stock: 2 },
            { size: '39', color: 'black', stock: 3 },
            { size: '40', color: 'grey', stock: 3 },
            { size: '41', color: 'grey', stock: 3 },
        ],
        images: [
            'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg',
            'https://images.pexels.com/photos/2529145/pexels-photo-2529145.jpeg',
            'https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg',
        ],
        tabs: {
            details: 'O Ultraboost 22 foi projetado para fornecer conforto e retorno de energia excepcionais.',
            specs: 'Solado Continental™, entressola Boost, cabedal Primeknit.',
            reviews: 'Usuários destacam o amortecimento suave e o ajuste firme no pé.',
            questions: 'Serve para treinos intensos? Ele laceia com o tempo?'
        }
    },
    {
        id: 'puma-rs-x-toys',
        name: 'Puma RS-X Toys',
        description: 'Bold and playful, the Puma RS-X Toys bring retro design...',
        price: 599.9,
        rating: 4.5,
        reviews: 45,
        colors: [
            { name: 'multi', value: '#FF69B4' },
            { name: 'black', value: '#000000' },
        ],
        sizes: [
            { size: '38', color: 'multi', stock: 2 },
            { size: '39', color: 'multi', stock: 3 },
            { size: '40', color: 'black', stock: 3 },
            { size: '41', color: 'black', stock: 2 },
            { size: '42', color: 'black', stock: 2 },
        ],
        images: [
            'https://images.pexels.com/photos/2529150/pexels-photo-2529150.jpeg',
            'https://images.pexels.com/photos/2529151/pexels-photo-2529151.jpeg',
        ],
        tabs: {
            details: 'Inspirado nos anos 80, o RS-X Toys combina estilo retrô com conforto atual.',
            specs: 'Entressola em PU, design chunky, cabedal multicolorido.',
            reviews: 'Estilo ousado e ideal para quem busca originalidade no visual.',
            questions: 'Combina com roupas casuais? Como limpar o tênis?'
        }
    },
    {
        id: 'new-balance-574',
        name: 'New Balance 574',
        description: 'Classic style meets modern comfort...',
        price: 499.9,
        rating: 4.3,
        reviews: 75,
        colors: [
            { name: 'grey', value: '#808080' },
            { name: 'navy', value: '#000080' },
            { name: 'white', value: '#FFFFFF' },
        ],
        sizes: [
            { size: '37', color: 'grey', stock: 3 },
            { size: '38', color: 'navy', stock: 3 },
            { size: '39', color: 'white', stock: 3 },
            { size: '40', color: 'white', stock: 3 },
            { size: '41', color: 'navy', stock: 3 },
            { size: '42', color: 'grey', stock: 3 },
            { size: '43', color: 'white', stock: 2 },
        ],
        images: [
            'https://images.pexels.com/photos/2529152/pexels-photo-2529152.jpeg',
            'https://images.pexels.com/photos/2529153/pexels-photo-2529153.jpeg',
        ],
        tabs: {
            details: 'O New Balance 574 é um clássico atemporal com toque retrô e conforto para o dia a dia.',
            specs: 'Cabedal em suede e mesh, solado em EVA e borracha, amortecimento ENCAP.',
            reviews: 'Muito elogiado pela versatilidade e durabilidade.',
            questions: 'Tem forma normal ou pequena? É resistente à água?'
        }
    },
];
