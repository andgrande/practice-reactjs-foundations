import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import {
  Container,
  Title,
  ImportFileContainer,
  Footer,
  FileSection,
} from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    uploadedFiles.map(item => data.append('file', item.file));

    try {
      await api.post('/transactions/import', data);
      // after processing, remove data from cache and screen
      data.delete('file');
      setUploadedFiles([]);
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const [fileToSubmit] = [
      ...files.map(file => {
        const fileToList: FileProps = {
          name: file.name,
          readableSize: filesize(file.size),
          file,
        };

        return fileToList;
      }),
    ];

    setUploadedFiles([fileToSubmit]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && (
            <FileSection>
              <FileList files={uploadedFiles} />
              <button type="button" onClick={() => setUploadedFiles([])}>
                Excluir
              </button>
            </FileSection>
          )}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
