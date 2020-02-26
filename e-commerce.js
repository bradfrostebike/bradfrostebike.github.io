window.apicartConfig = window.apicartConfig || [];
function apicartConfigure(config) {
	apicartConfig.push(config)
}
apicartConfigure({
	token: "9mCu3DlBCa4REI?Q7kKly!Rw6!_FvD8K_dgPXe1b20?r6!sPTQMyCpq_ADt!jXOD",
	currencySymbol: '$',
	currencySymbolPositionLeft: true,
	currencySymbolWithSpace: false,
	cart: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	customer: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	order: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	paymentMethods: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	shippingMethods: {
		apiUrl: 'https://store-api.apicart.dev'
	},
	init: function() {
		apicart.cartDropdown.render({
			el: '.cart-dropdown',
			showQuantityManipulator: true,
			toggleButton: `
				<button class="btn btn-lg btn-outline-dark">
					Cart: <strong class="cart-dropdown-items-count">%itemsCount%</strong>
					items for $<strong class="cart-dropdown-items-count">%itemsPrice%</strong>
				</button>
			`,
			infoBlock: '<strong>%name%</strong>',
			footerBlocks: [
				function(itemsCount, itemsPrice) {
					return `
						<div class="text-left">Number of items:` + itemsCount + `<br>Total price: `
							+ Brackets.getFilter('currency').call(null, itemsPrice);
						+ `</div>
					`;
				},
				'<div class="text-right"><a href="#delivery-information" class="btn btn-danger">Finish Order</a></div>'
			]
		});

		var quantityManipulators = document.querySelectorAll('.quantity-manipulator');
		Utils.loops.forEach(quantityManipulators, function(key, quantityManipulator) {
			apicart.cartQuantityManipulator.render({
				el: quantityManipulator,
				itemUrl: quantityManipulator.getAttribute('data-item-url'),
				submitButton: 'Add to Cart'
			})
		});

		apicart.paymentMethods.manager.getPaymentMethods(null, function(responseIsOk, response) {
			Brackets.render({
				el: '#payment-methods',
				data: {
					paymentMethods: responseIsOk ? response.data.findPaymentMethods.paymentMethods : null
				}
			});

			Utils.dataBinder.bindData(true);
		});

		apicart.shippingMethods.manager.getShippingMethods(null, function(responseIsOk, response) {
			Brackets.render({
				el: '#shipping-methods',
				data: {
					shippingMethods: responseIsOk ? response.data.findShippingMethods.shippingMethods : null
				}
			});

			Utils.dataBinder.bindData(true);
		});

		Utils.eventDispatcher.addListener('cart-finished', apicart.cart.events.FINISHED, function() {
			alert('Your order have been successfully send!');

			setTimeout(function() {
				window.location.href = window.location.pathname;
			}, 3000);
		});
	}
});
