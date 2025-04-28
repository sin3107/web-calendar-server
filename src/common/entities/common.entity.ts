import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Exclude } from 'class-transformer';
  
  export abstract class CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn({
      type: 'timestamptz' /* timestamp with time zone */,
    })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
  
    // Soft Delete : 기존에는 null, 삭제시에 timestamp를 찍는다.
    @Exclude()
    @DeleteDateColumn({ type: 'timestamptz' })
    deletedAt?: Date | null;
  }