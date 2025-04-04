import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @Index()
    username: string;

    @Column({ unique: true })
    @IsEmail()
    @Index()
    email: string;

    @Column()
    @IsString()
    @MinLength(8)
    password: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    firstName?: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    @MaxLength(50)
    lastName?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Optional: Password hash hook
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password && !this.password.startsWith('$2a$')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}