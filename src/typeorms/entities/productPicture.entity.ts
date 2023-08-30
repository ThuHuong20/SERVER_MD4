import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import productEntity from './product.entity'
@Entity()
class ProductPicture {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    url!: string

    @Column()
    productId!: string

    @ManyToOne(() => productEntity, (product) => product.pictures)
    product!: productEntity
}
export default ProductPicture 