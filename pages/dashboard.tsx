import VaultList from "../components/vault-test-swr";

export default function Dashboard() {
	return(
	<>
	<div>test</div>
	<VaultList></VaultList>
	</>
	)
}

// We need to get initial or get static properties then feed them into the page... maybe do this through aws?? TT DW

// https://nextjs.org/docs/basic-features/data-fetching/client-side

// second thought about this again brings me back to the use of SWR Unsure how to reconcile will continue to work on this


// see SWR Routing and client side data fetching on the vercel swr site
///https://swr.vercel.app/docs/with-nextjs

// https://swr.vercel.app/docs/typescript