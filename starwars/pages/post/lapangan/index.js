import { Text, Textarea, Grid, Button, Spacer, Input } from '@nextui-org/react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostLapangan() {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const fileInitialState = {
    image_url: '',
  };

  const [postImage, setPostImage] = useState(fileInitialState);
  const [image, setImage] = useState(null);

  const handleChangeImage = (e) => {
    setPostImage({ ...postImage, image_url: e.target.files[0] });
  };

  const uploadImage = async () => {
    try {
      const { data, error } = await supabaseClient.storage
        .from('lapangan')
        .upload(user.id + '/', postImage);

      if (data) {
        console.log(data);
        // getDataImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(postImage);

  const getDataImage = async () => {
    const { data, error } = await supabaseClient.storage
      .from('lapangan')
      .list(user?.id + '/', {
        limit: 100,
        offset: 0,
      });
    if (data !== null) {
      setImage(data);
    } else {
      alert('Error loading images');
      console.log(error);
    }
  };

  return (
    <Grid.Container gap={1}>
      <Spacer y={3} />
      <Grid xs={12}>
        <Input
          label='Upload Gambar Lapangan'
          type='file'
          name='image_url'
          aria-label='image_url'
          onChange={handleChangeImage}
        />
        <Button className='mt-16' color={'secondary'} onPress={uploadImage}>
          Upload Image
        </Button>
      </Grid>
    </Grid.Container>
  );
}

// import { Text, Textarea, Grid, Button, Spacer, Input } from '@nextui-org/react';
// import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
// import { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function PostLapangan() {
//   const user = useUser();
//   const supabaseClient = useSupabaseClient();
//   const router = useRouter();
//   const initialState = {
//     nama_lapangan: '',
//     tipe_lapangan: '',
//     harga_lapangan: 0,
//     jenis_olahraga: '',
//     alamat_lapangan: '',
//   };

//   const fileInitialState = {
//     lapangan_id: 0,
//     image_url: '',
//   };

//   const [postData, setPostData] = useState(initialState);
//   const [postImage, setPostImage] = useState(fileInitialState);
//   const [lapanganId, setLapanganId] = useState(0);
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setPostData({ ...postData, [e.target.name]: e.target.value });
//   };

//   const handleChangeImage = (e) => {
//     setPostImage({ ...postImage, [e.target.files[0]]: e.target.value });
//   };

//   const createLapangan = async () => {
//     try {
//       const { error } = await supabaseClient
//         .from('lapangan')
//         .insert([
//           {
//             nama_lapangan: postData.nama_lapangan,
//             tipe_lapangan: postData.tipe_lapangan,
//             harga_lapangan: postData.harga_lapangan,
//             jenis_olahraga: postData.jenis_olahraga,
//             alamat_lapangan: postData.alamat_lapangan,
//             user_id: user?.id,
//           },
//         ])
//         .single();
//       if (error) throw error;
//       alert('Postingan berhasil dibuat');
//       setPostData(initialState);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const getDataImage = async () => {
//     const { data, error } = await supabaseClient.storage
//       .from('lapangan')
//       .list(user?.id + '/', {
//         limit: 100,
//         offset: 0,
//       });
//     if (data !== null) {
//       setImage(data);
//     } else {
//       alert('Error loading images');
//       console.log(error);
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       const { data, error } = await supabaseClient.storage
//         .from('lapangan')
//         .upload(user.id + '/', postImage);

//       if (data) {
//         console.log(data);
//         // getDataImage();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const createImage = async () => {
//     try {
//       const { error } = await supabaseClient
//         .from('image')
//         .insert([
//           {
//             lapangan_id: lapanganId,
//             image_url: image,
//           },
//         ])
//         .single();
//       if (error) throw error;
//       alert('Postingan berhasil dibuat');
//       console.log(postImage);
//       setPostImage(fileInitialState);
//       // router.push('/');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const createDataLapangan = () => {
//     createLapangan();
//     uploadImage();
//     // createImage();
//   };

//   return (
//     <Grid.Container gap={1}>
//       <Spacer y={2} />
//       <Grid xs={12}>
//         <Grid xs={6}>
//           <Input
//             underlined
//             labelPlaceholder='Nama Lapangan'
//             color='secondary'
//             name='nama_lapangan'
//             aria-label='nama_lapangan'
//             fullWidth={true}
//             rows={1}
//             size='xl'
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid xs={6}>
//           <Input
//             underlined
//             labelPlaceholder='Tipe Lapangan'
//             color='secondary'
//             name='tipe_lapangan'
//             aria-label='tipe_lapangan'
//             fullWidth={true}
//             rows={1}
//             size='xl'
//             onChange={handleChange}
//           />
//         </Grid>
//       </Grid>
//       <Spacer y={3} />
//       <Grid xs={12}>
//         <Grid xs={6}>
//           <Input
//             underlined
//             labelPlaceholder='Harga Lapangan'
//             color='secondary'
//             name='harga_lapangan'
//             aria-label='harga_lapangan'
//             fullWidth={true}
//             typeof='number'
//             rows={1}
//             size='xl'
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid xs={6} justify='center'>
//           <Input
//             underlined
//             labelPlaceholder='Jenis Olahraga'
//             color='secondary'
//             name='jenis_olahraga'
//             aria-label='jenis_olahraga'
//             fullWidth={true}
//             typeof='number'
//             rows={1}
//             size='xl'
//             onChange={handleChange}
//           />
//         </Grid>
//       </Grid>

//       <Spacer y={3} />
//       <Grid xs={12}>
//         <Textarea
//           underlined
//           labelPlaceholder='Alamat Lapangan'
//           color='secondary'
//           name='alamat_lapangan'
//           aria-label='alamat_lapangan'
//           fullWidth={true}
//           rows={3}
//           size='xl'
//           onChange={handleChange}
//         />
//       </Grid>

//       <Spacer y={3} />
//       <Grid xs={12}>
//         <Input
//           label='Upload Gambar Lapangan'
//           type='file'
//           name='image_url'
//           aria-label='image_url'
//           onChange={handleChangeImage}
//         />
//         <Button className='mt-16' color={'secondary'} onPress={uploadImage}>
//           Upload Image
//         </Button>
//       </Grid>

//       <Grid xs={12}>
//         <Text>
//           Posting as <span className='span'>{user?.email}</span>
//         </Text>
//       </Grid>
//       <Button
//         className='mt-16'
//         color={'secondary'}
//         onPress={createDataLapangan}
//       >
//         Create Lapangan
//       </Button>
//     </Grid.Container>
//   );
// }
