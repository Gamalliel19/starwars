import LapanganCard from '../../components/LapanganCard';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Grid } from '@nextui-org/react';

export default function Lapangan() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLapangan();
  }, []);

  const getLapangan = async () => {
    const { data, error } = await supabaseClient
      .from('lapangan')
      .select('*, image(*)');

    if (data != null) {
      setLoading(false);
      setLapangan(data);
    } else {
      console.log(error);
    }
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <>
      <main>
        <Grid.Container gap={3} justify='flex-start'>
          {' '}
          {lapangan.map((lapangan) => (
            <LapanganCard
              key={lapangan.id}
              image_url={lapangan.image}
              nama={lapangan.nama_lapangan}
              harga={lapangan.harga_lapangan}
              alamat={lapangan.alamat_lapangan}
            />
          ))}
        </Grid.Container>
      </main>
    </>
  );
}
