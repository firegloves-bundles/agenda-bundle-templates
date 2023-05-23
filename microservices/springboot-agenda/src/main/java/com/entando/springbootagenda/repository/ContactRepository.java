package com.entando.springbootagenda.repository;

import com.entando.springbootagenda.model.entity.ContactEntity;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<ContactEntity, UUID> {

}
