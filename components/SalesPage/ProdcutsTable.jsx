import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"


const ProdcutsTable = ({ products, total, delivery }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Sr. no</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    products.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                                <Link href={'https://tirze-fit.com/product/' + item.slug} target="_blank">{item.productName}</Link>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-right">{item.price} zł</TableCell>
                            <TableCell className="text-right">{item.price * item.quantity} zł</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Delivery</TableCell>
                    <TableCell className={'text-right'}>{delivery}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className={'text-right'}>{total+delivery}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>

    )
}

export default ProdcutsTable