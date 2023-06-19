const DeleteButton = ({ postId }) => {
    const handleDelete = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Proses berhasil
          console.log('Data berhasil dihapus');
        } else {
          // Proses gagal
          console.error('Terjadi kesalahan saat menghapus data');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };
  
    return <button onClick={handleDelete}>Delete</button>;
  };
  
  export default DeleteButton;
  