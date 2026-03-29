import { getTheatersFromMap } from './src/services/theaterService';

async function main() {
  const data = await getTheatersFromMap();
  console.log(JSON.stringify(data, null, 2));
}

main();
