import { Module } from "@nestjs/common";
import { InMemoryStore } from "./in-memory.store";

@Module({
  exports: [InMemoryStore],
  providers: [InMemoryStore],
})
export class DataModule {}
