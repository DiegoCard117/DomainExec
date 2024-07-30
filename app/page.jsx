"use client";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CommandBlock } from "@/components/ui/myComponents/commandBlock";


export default function Home() {
  const [tipo, setTipo] = useState([]);
  const [command, setCommand] = useState();

  const [comandoText, setComandoText] = useState();
  const [comandoName, setComandoName] = useState();
  const [comandoType, setComandoType] = useState(1);

  const [computadores, setComputadores] = useState([]);
  const [computerName, setComputerName] = useState('');
  const [computerGroup, setComputerGroup] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getTypes", {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTipo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataC = async () => {
      try {
        const response = await fetch("/api/getCommand");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCommand(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataC();
  }, []);

  const sendDeleteBody = [
    {
      "nome": comandoName,
      "comando": comandoText,
      "tipo": comandoType
    }
  ];

  async function insertComando() {
    if (sendDeleteBody[0]['nome'] == undefined || sendDeleteBody[0]['comando'] == undefined) {
      alert('Preencha os Campos Necessários');
    } else {
      await fetch("/api/addCommand", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendDeleteBody)
      });
    }
  }

  async function addPc() {
    const computadores = [];
    computadores.push({ "nome": computerGroup, "computador": computerName.toUpperCase() });
    await fetch("/api/addPc", {
      method: "POST",
      body: JSON.stringify(computadores)
    });
  }

  const handleChangeSelectType = (value) => {
    if (value == 'CMD') {
      setComandoType(1);
    } else {
      setComandoType(2);
    }
  };

  return (
    <div className="flex flex-col justify-around h-full">
      <main className="mt-10 flex flex-wrap justify-around items-center w-[80%] m-auto">

        <CommandBlock tipo={tipo} command={command} />

        <form className="flex flex-col justify-around items-center border border-primary p-2 w-[400px] h-[400px] rounded-md" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Grupo" className="mb-2 py-2" onChange={(e) => setComputerGroup(e.target.value)} />
          <div className="w-full flex justify-between">
            <Input placeholder="Computadores" className="mb-2 py-2" onChange={(e) => setComputerName(e.target.value)} />
          </div>
          <Button onClick={() => addPc()}>Cadastrar Computadores</Button>
          {computadores.map(({ NOME }, index) => (
            <div key={index} className="flex justify-around">
              <p>{NOME}</p>
              <Button variant="destructive">-</Button>
            </div>
          ))}
        </form>

        <form className="flex flex-col border border-primary itens p-2 w-[400px] h-[400px] rounded-md" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Nome" className="mb-2 py-2" onChange={(e) => setComandoName(e.target.value)} />

          <Select onValueChange={handleChangeSelectType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Escolha o Terminal" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup >
                <SelectLabel>Terminais</SelectLabel>
                {tipo.map(({ NOME }, index) => (
                  <SelectItem key={index} value={NOME} >{NOME}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Textarea className="my-2 h-full" placeholder="Escreva o comando" onChange={(e) => setComandoText(e.target.value)} value={comandoText} />

          <Button className="w-1/2 flex self-center " onClick={() => {
            insertComando();
          }}>Inserir</Button>
        </form>

      </main>
    </div>
  );
}
