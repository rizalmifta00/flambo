import prisma from '../db'

export const getAllProduct =async () => {
    const product = await prisma.product.findMany({
        include: {
            productImages: {
                include : {
                    image:true
                }
            }
        }
    })
    
    const productsResponse = product.map((product) => ({
        id: product.id,
        brand: product.brandId,
        sub_child: product.subChildId,
        name: product.name,
        images: product.productImages.map((productImage) => ({
            id: productImage.image.id,
            url: productImage.image.url,
        })),
    }));

    return productsResponse;
    
}