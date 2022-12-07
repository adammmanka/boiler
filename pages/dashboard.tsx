import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard({ apiData }) {
	return (
		<Layout page="Cryptocurrency Prices">
			<ul className="flex justify-around py-10">
				{apiData.map((crypto, index) => (
					<li
						key={index}
						className="relative hover:shadow-md p-8 border border-blue-300 rounded-3xl bg-blue-100 md:w-auto flex-1 mx-5"
					>
						<Link href={`/${crypto.id}`}>
							<a className="rounded-md">
								<div className="text-center">
									<Image
										src={crypto.logo_url}
										alt={crypto.name}
										className="mx-auto mb-6"
                    width="80"
                    height="80"
									/>
								</div>
								<h2 className="text-2xl mb-6 uppercase tracking-wider">
									{crypto.name}
								</h2>
								<h3 className="font-bold text-2xl mb-4">
									{parseFloat(crypto.price).toFixed(2)} USD
								</h3>
								<p>
									1 jour :{' '}
									<span className="font-bold">
										{parseFloat(crypto['1d'].price_change_pct * 100).toFixed(
											2
										) + '%'}{' '}
									</span>
									{crypto['1d'].price_change_pct < 0 ? (
										<span className="text-red-500">&#x2798;</span>
									) : (
										<span className="text-green-500">&#x279A;</span>
									)}
								</p>
								<p>
									1 mois :{' '}
									<span className="font-bold">
										{Math.round(crypto['30d'].price_change_pct * 100) + '%'}{' '}
									</span>
									{crypto['30d'].price_change_pct < 0 ? (
										<span className="text-red-500">&#x2798;</span>
									) : (
										<span className="text-green-500">&#x279A;</span>
									)}
								</p>
								<p>
									1 an :{' '}
									<span className="font-bold">
										{Math.round(crypto['365d'].price_change_pct * 100) + '%'}{' '}
									</span>
									{crypto['365d'].price_change_pct < 0 ? (
										<span className="text-red-500">&#x2798;</span>
									) : (
										<span className="text-green-500">&#x279A;</span>
									)}
								</p>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</Layout>
	);
}

// fetch API data then return as props
export async function getStaticProps(context) {
  const apiKey = process.env.API_KEY;
	try {
		const apiData = await fetch(
			`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=BTC,ETH,XRP&interval=1d,30d,365d&per-page=100&page=1`
		).then((res) => res.json());

		return {
			props: { apiData },
		};
	} catch (err) {
		console.error('An error occured: ', err);
	}
}

// We need to get initial or get static properties then feed them into the page... maybe do this through aws?? TT DW

// https://nextjs.org/docs/basic-features/data-fetching/client-side

// second thought about this again brings me back to the use of SWR Unsure how to reconcile will continue to work on this


// see SWR Routing and client side data fetching on the vercel swr site
///https://swr.vercel.app/docs/with-nextjs

// https://swr.vercel.app/docs/typescript