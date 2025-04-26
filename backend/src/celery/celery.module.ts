import { Injectable, Module } from "@nestjs/common";
import { CeleryClientService } from "./celeryclient.service";
import { CeleryWorkerService } from "./celeryWorker.service";

@Module({
    providers:[CeleryClientService,CeleryWorkerService],
    exports: [CeleryClientService,CeleryWorkerService]
})
export class CeleryModule {}