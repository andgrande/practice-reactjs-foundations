import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const Form = styled.form`
  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(3, 1fr);
  /* grid-gap: 32px; */
  border: 0px;
  margin-top: 50px;
  width: 100%;
  max-width: 1120px;

  input {
    width: 80%;
    margin: 0;
    justify-content: space-between;
    align-self: flex-start;

    /* Chrome, Safari, Edge, Opera */
    input:-webkit-outer-spin-button,
    input:-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type='number'] {
      -moz-appearance: textfield;
    }

    & + input {
      margin-right: 50px;
    }
  }

  svg {
    justify-content: flex-end;
    margin-right: 50px;
    margin-left: 50px;
    border-radius: 50%;
    width: 25%;
    height: 30px;
    cursor: pointer;
    color: blue;
    border: 1px;
  }
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#FF872C' : '#fff')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#fff' : '#363F5F')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    thead {
      tr {
        &:hover {
          transform: none;
          background: none;
        }
      }
    }

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    tr {
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.01, 1.01);
      }
    }

    td {
      padding: 20px 12px;
      margin-right: -150px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      input {
        width: 50%;
        border: 0px;
      }

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }

      button {
        margin-left: 25px;
        margin-right: -250px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        color: #fff;
        background-color: #e83f5b;
      }

      svg {
        margin-left: 25px;
        margin-right: -200px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        color: blue;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
