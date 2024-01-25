type Payment = {
    id: string;
    amount: number;
    status: 'Pending' | 'Processing' | 'Success' | 'Failed';
    email: string;
    name: string;
};

export const load = async ({ url }: any) => {
    const payments = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'Success',
			email: 'ken99@yahoo.com',
			name: 'Aleo'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'Success',
			email: 'Abe45@gmail.com',
			name: 'Jji'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'Processing',
			email: 'Monserrat44@gmail.com',
			name: 'BJax'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'Success',
			email: 'Silas22@gmail.com',
			name: 'Anna'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'Failed',
			email: 'carmella@hotmail.com',
			name: 'CTomas'
		}
	];

    return {
        payments
    };
};
