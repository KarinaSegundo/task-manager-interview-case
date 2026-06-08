# Task Manager - Case de Engenharia

Este projeto é uma solução de gerenciamento de tarefas desenvolvida com foco total em **performance**, **escalabilidade** e **usabilidade**. O objetivo central foi entregar uma aplicação robusta e intuitiva, preparada para atender usuários que dependem de dispositivos móveis e conexões de internet limitadas.

## 🎯 Valor para o Usuário
* **Agilidade:** Otimizei o carregamento para que a interface seja responsiva e rápida, garantindo que o usuário interaja com suas tarefas instantaneamente.
* **Experiência Limpa:** Validações intuitivas que orientam o usuário e evitam erros durante o uso.
* **Confiabilidade:** Aplicação estável e testada, assegurando que o fluxo de trabalho não seja interrompido por falhas inesperadas.

## 🚀 Como acessar a demonstração
* [Acesse a versão online do projeto aqui](https://task-manager-interview-case-d1vq.vercel.app/)

## 🧠 Arquitetura e Decisões Técnicas
Como responsável pelo projeto, tomei decisões estratégicas para equilibrar a agilidade de entrega com a sustentabilidade do código a longo prazo:

* **Por que Angular?** Optei por manter a stack Angular pela sua maturidade e robustez. Foquei em **otimizações cirúrgicas** (como `OnPush`, `Async Pipe` e `TrackBy`), que extraíram o máximo de performance da framework, garantindo um resultado final superior sem os riscos inerentes a uma migração completa.
* **Arquitetura Modular:** Estruturei o código em camadas (Core/Shared/Features) para garantir desacoplamento, facilitando a manutenção e a inserção de novas funcionalidades no futuro.
* **Foco em Performance:** Implementei técnicas que priorizam o carregamento do conteúdo crítico, garantindo que a aplicação seja leve mesmo em dispositivos com menor capacidade de processamento.

## 🛠️ Qualidade e Testes
A aplicação conta com uma camada de **testes automatizados** focada nas regras de negócio críticas. Isso permitiu o desenvolvimento com segurança, garantindo que novas adições não introduzam comportamentos inesperados no sistema.

## ⏭️ Próximos Passos (Roadmap)
O projeto foi estruturado para evoluir de forma sustentável. As melhorias planejadas para a próxima fase incluem:
1. **Experiência Offline:** Implementação de *Service Workers* para garantir que o usuário continue produtivo mesmo em áreas com conexão instável.
2. **Monitoramento e Observabilidade:** Integração de ferramentas de rastreamento de erros para identificar falhas em tempo real.
3. **Internacionalização:** Preparação da arquitetura para suportar múltiplos idiomas, facilitando a expansão para novos mercados.

---
*Desenvolvido por Karina Sousa.*