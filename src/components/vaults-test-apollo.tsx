import Head from 'next/head';
import { useQuery } from '@apollo/client';

import QUERY_COUNTRIES from './VaultsQuery.graphql';
import * as pools from '../../subgraph';

// const vaults = async () => {
//     const result = await pools.getPools(
//         'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', 
//         { first: 10 }, 
//         {id: true, token0Price: true, token1Price: true}
//     );
// }

// import styles from '../styles/Home.module.css';

export default function AMarkets() {
  const { data, loading, error } = useQuery(QUERY_COUNTRIES);
  console.log(data);
  JSON.stringify(data);
  console.log(data);
  // check for errors
  if (error) {
    return <p>:( an error happened</p>;
  }

  // if all good return data
  return (
    <div >
      <Head>
        <title>Vaults GraphQL</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Vaults</h1>
      {/* let the user know we are fetching the countries */}
      {loading && <p>loading...</p>}
      <div>
        {data?.pools.map((pools: any) => (
                <div className="stats bg-primary text-primary-content" key={pools.id}>
                        
                <div className="stat">
                <div className="stat" >
              <div className="stat-title">{pools.token0.name}/{pools.token1.name} Pool</div>
              <div className="stat-value">{pools.token0Price} / {pools.token1Price}</div>
              <div className="stat-actions">
                    <button className="btn btn-sm btn-success">Add funds</button>
                  </div>
                </div>
                        
                <div className="stat">
                  <div className="stat-title">Current balance</div>
                  <div className="stat-value">$89,400</div>
                  <div className="stat-actions">
                    <button className="btn btn-sm">Withdrawal</button> 
                    <button className="btn btn-sm">deposit</button>
                  </div>
                </div>    
                </div>
                </div>
        ))}
      
    </div>
    </div>
  );
}