import { ethers } from "ethers";
import React, {useState} from 'react';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { JSONRPC_PROVIDER } from "./secrets.json";
import Analytics, { VAULTS } from './VaultCard';
import Link from 'next/link'
import vercelimg from '/vercel.svg';

const UNISWAP_V3_APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3"

export const VAULTS = {
    hoodie: {
      token: "0xdffa3a7f5b40789c7a437dbe7b31b47f9b08fe75",
      pool: "0xf1a8f0d86659c67780e3396bd6aee05af3566c6a",
      image: vercelimg
    },
    dead: {
      token: "0x0c7060bf06a78aaaab3fac76941318a52a3f4613",
      pool: "0xcae45fc418e37e1fdb8e20536a643c5bf2301e01",
      image: vercelimg
    },}


 export default function VaultGrid() {
    const tokenContract = new ethers.Contract(VAULTS[vault].token, tokenVaultAbi, jsonRpcProvider);

    // from token contract (fractional's tokenVault) using ethers
    const [name, setName] = useState();
    const [symbol, setSymbol] = useState();
    const [reservePrice, setReservePrice] = useState();
    const [totalSupply, setTotalSupply] = useState();
  
    // from UNISWAP V3 graph
    const [token0, setToken0] = useState();
    const [token1, setToken1] = useState();
    const [token0Price, setToken0Price] = useState();
    const [token1Price, setToken1Price] = useState();
    const [liquidityToken0, setLiquidityToken0] = useState();
    const [liquidityToken1, setLiquidityToken1] = useState();
    const [swaps, setSwaps] = useState([]);
    const [poolHourData, setPoolHourData] = useState([]);
    



    // Uniswap v3 subgraph data
      // Run once for poolQueryData
      const poolQuery = `
        {
          pool (id: "${VAULTS[vault].pool}") {
            token0 {
              symbol
            },
            token1 {
              symbol
            },
            token0Price,
            token1Price,
            totalValueLockedToken0,
            totalValueLockedToken1,
            swaps(orderBy: timestamp, orderDirection: desc) {
              timestamp,
              amount0,
              amount1
            }
          }
        }
      `
      let poolQueryData = (await apolloClient.query({query: gql(poolQuery)})).data.pool;
      setToken0(poolQueryData.token0.symbol);
      setToken1(poolQueryData.token1.symbol);
      setToken0Price(poolQueryData.token0Price);
      setToken1Price(poolQueryData.token1Price);
      setLiquidityToken0(poolQueryData.totalValueLockedToken0);
      setLiquidityToken1(poolQueryData.totalValueLockedToken1);
      setSwaps(poolQueryData.swaps);
      // Paginate until all pool hour data is fetched
      let singlePagePoolHourData;
      let allPoolHourData = [];
      let poolHourDataSkip = 0;
      let poolHourDataQuery = `
        {
          pool (id: "${VAULTS[vault].pool}") {
            poolHourData(first: 100, skip: ${poolHourDataSkip}) {
              periodStartUnix,
              open,
              high,
              low,
              close
            }
          }
        }
      `
      do {
        singlePagePoolHourData = (await client.query({query: gql(poolHourDataQuery)})).data.pool.poolHourData;
        poolHourDataSkip += 100;
        // Have to update the query 
        poolHourDataQuery = `
        {
          pool (id: "${VAULTS[vault].pool}") {
            poolHourData(first: 100, skip: ${poolHourDataSkip}) {
              periodStartUnix,
              open,
              high,
              low,
              close
            }
          }
        }
        `
        allPoolHourData.push(...singlePagePoolHourData);
      } while (singlePagePoolHourData.length === 100);
      setPoolHourData(allPoolHourData.slice(1).map(x => ({  // Remove the first tick as that starts at 0
        close: parseFloat(x.close),
        time: x.periodStartUnix,
        open: parseFloat(x.open),
        low: parseFloat(x.low),
        high: parseFloat(x.high)
      })));
    }
    retrieveData();
  }, [vault]);

    
    
    
    
    const provider = new ethers.providers.JsonRpcProvider(JSONRPC_PROVIDER);
    // client for GraphQL queries
    const client = new ApolloClient({
      uri: UNISWAP_V3_APIURL,
      cache: new InMemoryCache()
    });

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
        (index) =>
          `https://api.github.com/repos/${repo}/issues?per_page=${PAGE_SIZE}&page=${
            index + 1
          }`,
        fetcher
      );

    const links = Object.entries(VAULTS).map(([x, y]) => {
        return <li key={x} className="sidebar-link"><Link href={"/" + x} style={{color: "inherit", fontSize: "125%"}}><div>${x.toUpperCase()}</div></Link></li>
      });

      
      return (
        <div children={<Analytics jsonRpcProvider={provider} apolloClient={client} />} />
      );
  }


  