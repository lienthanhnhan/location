import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('location')
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'location_number', unique: true })
  locationNumber: string;

  @Column({ default: 1, type: 'float' })
  area: number;

  @ManyToOne(() => LocationEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent?: LocationEntity;

  @Column({ name: 'parent_id', nullable: true })
  parentId?: string;
}
