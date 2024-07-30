'use client';
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CommandBlock({ tipo, command }) {
  const [commandNow, setCommandNow] = useState();
  const [terminal, setTerminal] = useState("cmd");
  const [terminalId, setTerminalId] = useState(1);

  const [res, setRes] = useState();

  console.log(terminal);

  function reloadCommands() {
    setReload(prev => prev + 1);
  }

  const handleChangeSelect = (value) => {
    if (value == 'CMD') {
      setTerminalId(1);
    } else {
      setTerminalId(2);
    }
  };

  async function deleteComando(ID) {
    await fetch("/api/deleteCommand", {
      method: 'DELETE',
      body: JSON.stringify(ID)
    });
  }

  function handleClick(terminal) {
    const computerArr = ["ti03"];

    computerArr.map((item) => {
      const url = `http://${item}:9995/${terminal.toLowerCase()}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          dominio: process.env.NEXT_PUBLIC_DOMAIN,
          user: process.env.NEXT_PUBLIC_USER,
          pass: process.env.NEXT_PUBLIC_USER_PASS,
          comando: `${commandNow}`,
          retorno: "True",
        }),
      })
        .then((res) => res.json())
        .then((result) => setRes(JSON.stringify(result)))
        .catch((err) => console.error(err));
    });
  }

  return (
    <div className="border border-primary p-2 w-[400px] min-h-[400px] rounded-md my-2">
      <div className="flex justify-between">
        <Select onValueChange={handleChangeSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="CMD" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup >
              <SelectLabel>Terminais</SelectLabel>
              {tipo.map(({ NOME }, index) => (
                <SelectItem key={index} value={NOME}>{NOME}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={() => reloadCommands()}>Recarregar</Button>
      </div>

      <div className="text-white flex flex-col my-4 rounded-md">
        {command?.filter(item => item.TIPO === terminalId).map(({ NOME, ID, COMANDOS }, index) => (
          <div key={index} className="flex justify-between my-1">
            <Button onClick={() => setCommandNow(COMANDOS)}>{NOME}</Button>
            <form>
              <Button variant="destructive" onClick={() => {
                deleteComando(ID);
                setTimeout(() => {
                  setObserver(prev => prev + 1);
                }, 200);
              }}>Apagar</Button>
            </form>
          </div>
        ))}
      </div>
      <Textarea className="my-4 max-h-[170px]" onChange={(e) => setCommandNow(e.target.value)} value={commandNow} />
      <div className="flex flex-col items-center mb-1">
        <Button onClick={() => handleClick(terminal)}>Executar comando</Button>
      </div>
      <div className="w-[90%] max-h-96 m-auto border border-primary p-2 my-2 rounded-md overflow-auto">{res}</div>
    </div>
  );
}