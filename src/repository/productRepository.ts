import prisma from '../db'

export const getAllProduct =async (queryParams: any) => {
    const { brandname, subChildname, name } = queryParams;
    const product = await prisma.product.findMany({
       where: {
            brand: brandname ?  { name: { contains: brandname, mode: 'insensitive' } } : undefined,
            sub_child: subChildname ? { name: { contains: subChildname, mode: 'insensitive' } } : undefined,
            name: name? { contains: name.toString(),mode: 'insensitive' } : undefined,
        },
        include: {
            productImages: {
                include : {
                    image:true
                }
            },
            brand:true,
            sub_child:true,
        }
    })
    
    const productsResponse = product.map((product) => ({
        id: product.id,
        brand: product.brand.name,
        sub_child: product.sub_child.name,
        name: product.name,
        images: product.productImages.map((productImage) => ({
            id: productImage.image.id,
            url: productImage.image.url,
        })),
    }));

    return productsResponse;
    
}

export const getProductById = async (id:string) => {
    const product = await prisma.product.findUnique({
        where :{
            id :id
        },
        include:{
            productImages:{
                include:{
                    image:true
                }
            },
            brand: true,
            sub_child:true
        }
    });

    if(!product){
        throw new Error("product not found");
    }
    const images = product.productImages.map((productImage) => ({
        id: productImage.image.id,
        url: productImage.image.url,
    }));

    const productResponse = {
        id: product.id,
        brand: product.brand.name,
        sub_child: product.sub_child.name,
        name: product.name,
        images: images,
    };
    return productResponse;

}