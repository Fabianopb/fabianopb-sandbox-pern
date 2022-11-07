import { Button, colors, LinearProgress, TextField, Table, TableHead, TableRow, TableCell } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addPs4Game, getPs4Games } from '../apis/playstation';
import { isSessionValid } from '../common/session';

type FormValues = {
  gameId: string;
  name: string;
  imageSrc?: string;
};

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 24px;
  background-color: ${colors.deepPurple[800]};
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 24px auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(TextField).attrs({ fullWidth: true, variant: 'outlined', size: 'small' })`
  :not(:first-child) {
    margin-left: 16px;
  }
`;

const Actions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

// TODO: show wishlist table

const PlaystationView = () => {
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<FormValues>({ defaultValues: { gameId: '', name: '', imageSrc: '' } });

  const { data, isLoading, refetch: refetchList } = useQuery(['playstation', 'wishlist'], () => getPs4Games());

  const { mutate, isLoading: isSaving } = useMutation((values: FormValues) => addPs4Game(values), {
    onSuccess: () => {
      resetForm();
      refetchList();
    },
    onError: (error?: any) => {
      const message = error?.response?.data?.message || error?.message;
      toast(message || 'Unkown error!', { type: 'error' });
    },
  });
  return (
    <Root>
      <TopBar>🤍 PlayStation Wishlist</TopBar>
      <Content>
        {isSessionValid() && (
          <Form>
            <FormRow>
              <StyledInput label="Game ID" disabled={isSaving} {...register('gameId')} />
              <StyledInput label="Name" disabled={isSaving} {...register('name')} />
            </FormRow>
            <FormRow>
              <StyledInput label="Image Link" disabled={isSaving} {...register('imageSrc')} />
            </FormRow>
            <Actions>
              <Button
                style={{ marginLeft: 16 }}
                variant="outlined"
                color="secondary"
                disabled={isSaving}
                onClick={() => resetForm()}
              >
                Clear
              </Button>
              <Button
                style={{ marginLeft: 16 }}
                variant="contained"
                color="primary"
                disabled={isSaving}
                onClick={handleSubmit((values) => mutate(values))}
              >
                Save
              </Button>
            </Actions>
          </Form>
        )}
        {isLoading && <LinearProgress />}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Original price</TableCell>
              <TableCell>Discount price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Valid until</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </Content>
    </Root>
  );
};

export default PlaystationView;
