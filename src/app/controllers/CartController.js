const { addOne, removeOne } = require('../../lib/cart')
const Cart = require('../../lib/cart')

const LoadProductsService = require('../services/LoadProductService')


module.exports = { 
     async index(req, res) {
        try {

            let { cart } = req.session

            // gerenciador de carrinho
            cart = Cart.init(cart)

            return res.render("cart/index", { cart })

        
        }catch (error) {
           console.error(error) 
        }
    },

    async addOne(req, res) {
        //pegar o id do produto e o produto
        const { id } = req.params
        const product = await LoadProductsService.load('product', { where: {id}})

        // pegar o carrinho da sessao
        let { cart } = req.session

        // adidionar o produto ao carrinho (usando o gerenciador de carrinho)
        cart = Cart.init(cart).addOne(product)

        // atualizar o carrinho da sessao
        req.session.cart = cart

        // redirecionar o usuario para a tela do carrinho
        return res.redirect('/cart')
    },

    removeOne(req, res) {
        // pegar o id do produto
        let { id } = req.params

        // pegar o carrinho da sessao
        let { cart } = req.session
        
        // se nao tiver, retornar
        if (!cart) return res.redirect('/cart')

        // iniciar o carrinho (gerenciador de carrinho) e remover
        cart = Cart.init(cart).removeOne(id)

        // atualizar o carrinho da sessao, removendo 1 item
        req.session.cart = cart

        //redirecionamento para a pagina cart
        return res.redirect('/cart')

    },

    delete(req, res) {
        let { id } = req.params
        let { cart } = req.session

        if(!cart) return

        req.session.cart = Cart.init(cart).delete(req.params.id)

        return res.redirect('/cart')
        
    }
}
